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
    const ebsVolume = {
      volumeType: 'Throughput Optimized HDD', // Magnetic, Provisioned IOPS, Cold HDD, Throughput Optimized HDD, General Purpose
      location: 'US East (N. Virginia)',
      productFamily: 'Storage'
    };

    this.describeService('AmazonS3', '100', (data, err) => {
      console.log(data);
    });

    this.getAttributes('volumeType', 'AmazonS3', '100', (data, err) => {
      console.log(data);
    });

    this.getEc2Price(ec2Instance, billingOption, (price, err) => {
      console.log({
        instance: ec2Instance,
        billing: billingOption,
        price
      });
    });

    this.getS3Price(
      10000000,
      'Standard',
      'US East (N. Virginia)',
      (price, err) => {
        console.log('s3-price', price);
      }
    );

    this.getEbsPrice(ebsVolume, (price, err) => {
      console.log(price);
    });
  }

  describeService = (ServiceCode, MaxResults, result) => {
    var params = {
      // FormatVersion: 'aws_v1',
      MaxResults,
      ServiceCode
    };
    let apiName = 'AWSPricing'; // replace this with your api name.
    let path = '/services'; //replace this with the path you have configured on your API
    let myInit = {
      body: { params } // replace this with attributes you need
    };

    API.post(apiName, path, myInit)
      .then(response => {
        result(response, null);
      })
      .catch(error => {
        console.log(error.response);
        result(null, error.response);
      });
  };

  getAttributes = (AttributeName, ServiceCode, MaxResults, result) => {
    var params = {
      AttributeName,
      MaxResults,
      ServiceCode
    };
    let apiName = 'AWSPricing'; // replace this with your api name.
    let path = '/attributes'; //replace this with the path you have configured on your API
    let myInit = {
      body: { params } // replace this with attributes you need
    };

    API.post(apiName, path, myInit)
      .then(response => {
        result(response, null);
      })
      .catch(error => {
        console.log(error.response);
        result(null, error.response);
      });
  };

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
    let path = '/products';
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
    let path = '/products'; //replace this with the path you have configured on your API
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

  getS3Price = (sizeInGB, volumeType, location, result) => {
    const params = {
      ServiceCode: 'AmazonS3',
      FormatVersion: 'aws_v1',
      MaxResults: 100,
      Filters: this.createFilters({ volumeType, location })
    };
    let apiName = 'AWSPricing'; // replace this with your api name.
    let path = '/products'; //replace this with the path you have configured on your API
    let myInit = {
      body: { params } // replace this with attributes you need
    };

    API.post(apiName, path, myInit)
      .then(response => {
        const sku = response[0];
        const onDemandKey = Object.keys(sku.terms.OnDemand)[0];
        const priceDimensionKeys = Object.keys(
          sku.terms.OnDemand[onDemandKey].priceDimensions
        );

        const priceRange = priceDimensionKeys.map(pd => {
          return {
            beginRange: Number(
              sku.terms.OnDemand[onDemandKey].priceDimensions[pd].beginRange
            ),
            endRange:
              sku.terms.OnDemand[onDemandKey].priceDimensions[pd].endRange ===
              'Inf'
                ? Number.POSITIVE_INFINITY
                : Number(
                    sku.terms.OnDemand[onDemandKey].priceDimensions[pd].endRange
                  ),
            price: Number(
              sku.terms.OnDemand[onDemandKey].priceDimensions[pd].pricePerUnit
                .USD
            ),
            description:
              sku.terms.OnDemand[onDemandKey].priceDimensions[pd].description
          };
        });
        //priceRange.sort(r => r.beginRange);
        priceRange.sort((a, b) => a.beginRange - b.beginRange);

        console.log(priceRange);

        var size = Number(sizeInGB); //Value in GB
        console.log(size);

        const priceStructure = priceRange
          .map(range => {
            const slab = range.endRange - range.beginRange;
            if (size > 0) {
              if (size - slab < 0) {
                const remainingSize = size;
                size = size - slab;
                return {
                  remainder: Number(0),
                  slab: remainingSize,
                  price: range.price,
                  description: range.description
                };
              }
              size = size - slab;
              return {
                remainder: size,
                slab,
                price: range.price,
                description: range.description
              };
            }
          })
          .filter(f => f != null);

        const price = priceStructure.reduce((prev, current) => {
          return prev + current.slab * current.price;
        }, 0);

        //console.log(price);
        result({ sku, priceStructure, price }, null);
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
