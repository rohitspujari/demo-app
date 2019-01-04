import React, { Component } from 'react';
import { API } from 'aws-amplify';

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
    const price = this.getEc2Price(ec2Instance, billingOption);
    console.log({
      instance: ec2Instance,
      billing: billingOption,
      price
    });
  }

  getEc2Price = (ec2Instance, billingOption) => {
    const price = { upfront: 0, hourly: 0 };
    const filters = Object.keys(ec2Instance).map(k => ({
      Type: 'TERM_MATCH',
      Field: k,
      Value: ec2Instance[k]
    }));
    const params = {
      ServiceCode: 'AmazonEC2',
      FormatVersion: 'aws_v1',
      MaxResults: 100,
      Filters: filters
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

        priceDimensions.forEach(pd => {
          if (sku.priceDimensions[pd].unit === 'Quantity')
            price.upfront = Number(sku.priceDimensions[pd].pricePerUnit.USD);
          if (sku.priceDimensions[pd].unit === 'Hrs')
            price.hourly = Number(sku.priceDimensions[pd].pricePerUnit.USD);
        });

        if (term === 'OnDemand') {
          price.cost3Years = Number(price.hourly * 8760 * 3);
          price.cost3Years = Number(price.cost3Years.toFixed(2));
        } else if (term === 'Reserved') {
          price.cost3Years =
            Number(
              price.hourly * 8760 * LeaseContractLength.replace('yr', '')
            ) + Number(price.upfront);

          if (LeaseContractLength === '1yr') {
            price.cost3Years = price.cost3Years * 3;
          }
          price.cost3Years = Number(price.cost3Years.toFixed(2));
        }

        ///console.log(priceDimensions);

        ////const sku = sku[Object.keys(sku.priceDimensions)[0]];

        ////8760 hours in year * 3 years * 0.644/hr

        ////console.log(options.map(o => o.offerTermCode));
      })
      .catch(error => {
        console.log(error.response);
      });
    return price;
  };

  render() {
    return (
      <div>
        <p>Welcome to Splunk Pricing Page</p>
      </div>
    );
  }
}
