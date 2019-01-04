import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { throws } from 'assert';

export default class SplunkPricing extends Component {
  componentDidMount() {
    const ec2Instance = {
      instanceType: 'c5.9xlarge',
      operatingSystem: 'Linux',
      location: 'US East (N. Virginia)',
      tenancy: 'shared',
      preInstalledSw: 'NA',
      operation: 'RunInstances',
      capacitystatus: 'Used'
    };
    const billingOption = {
      term: 'Reserved', //Onemand, Reserved
      LeaseContractLength: '3yr', // "1yr"
      OfferingClass: 'standard', // "standard", "convertible"
      PurchaseOption: 'Partial Upfront' // "No Upfront" , "All Upfront"
    };
    const ebsVolume = {
      volumeType: 'Throughput Optimized HDD', // Magnetic, Provisioned IOPS, Cold HDD, Throughput Optimized HDD, General Purpose
      location: 'US East (N. Virginia)',
      productFamily: 'Storage'
    };

    this.getEc2Price(ec2Instance, billingOption, (price, err) => {
      console.log({
        instance: ec2Instance,
        billing: billingOption,
        price
      });
    });

    this.getEbsPrice(ebsVolume, (price, err) => {
      console.log(price);
    });
  }

  createFilters = serviceObject => {
    return Object.keys(serviceObject).map(k => ({
      Type: 'TERM_MATCH',
      Field: k,
      Value: serviceObject[k]
    }));
  };

  getEc2Price = (ec2Instance, billingOption, result) => {
    // const filters = Object.keys(ec2Instance).map(k => ({
    //   Type: 'TERM_MATCH',
    //   Field: k,
    //   Value: ec2Instance[k]
    // }));
    const params = {
      ServiceCode: 'AmazonEC2',
      FormatVersion: 'aws_v1',
      MaxResults: 10,
      Filters: this.createFilters(ec2Instance)
    };

    let apiName = 'AWSPricing';
    let path = '/ec2';
    let myInit = {
      body: { params }
    };
    API.post(apiName, path, myInit)
      .then(response => {
        //console.log(params);

        const product = response[0];
        //console.log(product);

        const {
          term,
          LeaseContractLength,
          OfferingClass,
          PurchaseOption
        } = billingOption;

        var sku = null;
        const PurchaseOptions = Object.keys(product.terms[term]);

        if (term === 'OnDemand') {
          sku = product.terms[term][PurchaseOptions[0]];
        } else if (term === 'Reserved') {
          //console.log(PurchaseOptions);
          const skus = PurchaseOptions.map(
            option => product.terms[term][option]
          );
          sku = skus.filter(
            s =>
              s.termAttributes.LeaseContractLength === LeaseContractLength &&
              s.termAttributes.OfferingClass === OfferingClass &&
              s.termAttributes.PurchaseOption === PurchaseOption
          )[0];
        }

        const priceDimensions = Object.keys(sku.priceDimensions);

        const price = { upfront: 0, hourly: 0 };

        priceDimensions.forEach(pd => {
          if (sku.priceDimensions[pd].unit === 'Quantity')
            price.upfront = Number(sku.priceDimensions[pd].pricePerUnit.USD);
          if (sku.priceDimensions[pd].unit === 'Hrs')
            price.hourly = Number(sku.priceDimensions[pd].pricePerUnit.USD);
        });

        if (term === 'OnDemand') {
          price.cost3Years = Number(price.hourly * 8760 * 3);
          price.cost3Years = Number(price.cost3Years.toFixed(2));
          result(price, null);
        } else if (term === 'Reserved') {
          price.cost3Years =
            Number(
              price.hourly * 8760 * LeaseContractLength.replace('yr', '')
            ) + Number(price.upfront);

          if (LeaseContractLength === '1yr') {
            price.cost3Years = price.cost3Years * 3;
          }
          price.cost3Years = Number(price.cost3Years.toFixed(2));
          result(price, null);
        }
      })
      .catch(error => {
        console.log(error.response);
        result(null, error.response);
      });
  };

  getEbsPrice = (ebsVolume, result) => {
    const params = {
      ServiceCode: 'AmazonEC2',
      FormatVersion: 'aws_v1',
      MaxResults: 100,
      Filters: this.createFilters(ebsVolume)
    };
    let apiName = 'AWSPricing'; // replace this with your api name.
    let path = '/ebs'; //replace this with the path you have configured on your API
    let myInit = {
      body: { params } // replace this with attributes you need
    };

    API.post(apiName, path, myInit)
      .then(response => {
        const sku = response[0];
        //console.log(response);

        const onDemandKey = Object.keys(sku.terms.OnDemand)[0];
        const priceDimensionKey = Object.keys(
          sku.terms.OnDemand[onDemandKey].priceDimensions
        )[0];

        const price = {};
        price.GbPerMonth = Number(
          Number(
            sku.terms.OnDemand[onDemandKey].priceDimensions[priceDimensionKey]
              .pricePerUnit.USD
          ).toFixed(4)
        );

        //console.log(price);
        result(price, null);
      })
      .catch(error => {
        console.log(error.response);
        result(null, error.response);
      });
  };

  render() {
    return (
      <div>
        <p>Welcome to Splunk Pricing Page</p>
      </div>
    );
  }
}
