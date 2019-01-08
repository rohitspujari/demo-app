import { API } from 'aws-amplify';

export function getAttributes(AttributeName, ServiceCode, MaxResults, result) {
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
}

export function describeService(ServiceCode, MaxResults, result) {
  var params = {
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
}

export async function getEc2Price(
  quantity,
  instanceType,
  operatingSystem,
  location,
  billingOption
) {
  //Following properties are required,
  // const ec2Instance = {
  //   instanceType: 'c5.9xlarge',
  //   operatingSystem: 'Linux',
  //   location: 'US East (N. Virginia)',
  //   tenancy: 'shared',
  //   preInstalledSw: 'NA',
  //   operation: 'RunInstances',
  //   capacitystatus: 'Used'
  // };
  // const billingOption = {
  //   term: 'Reserved', //Onemand, Reserved
  //   LeaseContractLength: '3yr', // "1yr"
  //   OfferingClass: 'standard', // "standard", "convertible"
  //   PurchaseOption: 'Partial Upfront' // "No Upfront" , "All Upfront"
  // };

  const params = {
    ServiceCode: 'AmazonEC2',
    FormatVersion: 'aws_v1',
    MaxResults: 10,
    Filters: createFilters({
      instanceType,
      operatingSystem,
      location,
      tenancy: 'shared',
      preInstalledSw: 'NA',
      operation: 'RunInstances',
      capacitystatus: 'Used'
    })
  };

  // tenancy: 'shared',
  //   preInstalledSw: 'NA',
  //   operation: 'RunInstances',
  //   capacitystatus: 'Used'

  let apiName = 'AWSPricing';
  let path = '/products';
  let myInit = {
    body: { params }
  };

  try {
    const response = await API.post(apiName, path, myInit);
    const product = response[0]; //console.log(product);
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
      const skus = PurchaseOptions.map(option => product.terms[term][option]);
      sku = skus.filter(
        s =>
          s.termAttributes.LeaseContractLength === LeaseContractLength &&
          s.termAttributes.OfferingClass === OfferingClass &&
          s.termAttributes.PurchaseOption === PurchaseOption
      )[0];
    }

    const priceDimensions = Object.keys(sku.priceDimensions);

    const price = {
      product: product.product.attributes,
      upfront: 0,
      hourly: 0
    };

    priceDimensions.forEach(pd => {
      if (sku.priceDimensions[pd].unit === 'Quantity')
        price.upfront =
          Number(sku.priceDimensions[pd].pricePerUnit.USD) * quantity;
      if (sku.priceDimensions[pd].unit === 'Hrs')
        price.hourly = Number(sku.priceDimensions[pd].pricePerUnit.USD);
    });

    console.log('quantity', quantity);

    if (term === 'OnDemand') {
      price.cost3Years = Number(price.hourly * 8760 * 3 * quantity);
      price.cost3Years = Number(price.cost3Years.toFixed(2));
      return price; //result(price, null);
    } else if (term === 'Reserved') {
      price.cost3Years =
        Number(price.hourly * 8760 * LeaseContractLength.replace('yr', '')) +
        Number(price.upfront);

      if (LeaseContractLength === '1yr') {
        price.cost3Years = price.cost3Years * 3;
      }
      price.cost3Years = Number((price.cost3Years * quantity).toFixed(2));
      return price; //result(price, null);
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  // .then(response =>
  //   )
  // .catch(error => {
  //   console.log(error.response);
  //   result(null, error.response);
  // });
}

export function getEbsPrice(sizeInGB, volumeType, location, result) {
  const params = {
    ServiceCode: 'AmazonEC2',
    FormatVersion: 'aws_v1',
    MaxResults: 100,
    Filters: createFilters({ volumeType, location })
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
      const { price, priceStructure } = calculateMontlyStoragePrice(
        sku,
        sizeInGB
      );
      result({ sku, priceStructure, price }, null);
    })
    .catch(error => {
      console.log(error.response);
      result(null, error.response);
    });
}

export function getS3Price(sizeInGB, volumeType, location, result) {
  const params = {
    ServiceCode: 'AmazonS3',
    FormatVersion: 'aws_v1',
    MaxResults: 100,
    Filters: createFilters({ volumeType, location })
  };
  let apiName = 'AWSPricing'; // replace this with your api name.
  let path = '/products'; //replace this with the path you have configured on your API
  let myInit = {
    body: { params } // replace this with attributes you need
  };
  API.post(apiName, path, myInit)
    .then(response => {
      const sku = response[0];
      const { price, priceStructure } = calculateMontlyStoragePrice(
        sku,
        sizeInGB
      );
      result({ sku, priceStructure, price }, null);
    })
    .catch(error => {
      console.log(error.response);
      result(null, error.response);
    });
}

function createFilters(serviceObject) {
  return Object.keys(serviceObject).map(k => ({
    Type: 'TERM_MATCH',
    Field: k,
    Value: serviceObject[k]
  }));
}

function calculateMontlyStoragePrice(sku, sizeInGB) {
  const onDemandKey = Object.keys(sku.terms.OnDemand)[0]; //
  const priceDimensionKeys = Object.keys(
    sku.terms.OnDemand[onDemandKey].priceDimensions
  );
  const priceRange = priceDimensionKeys.map(pd => {
    return {
      beginRange: Number(
        sku.terms.OnDemand[onDemandKey].priceDimensions[pd].beginRange
      ),
      endRange:
        sku.terms.OnDemand[onDemandKey].priceDimensions[pd].endRange === 'Inf'
          ? Number.POSITIVE_INFINITY
          : Number(
              sku.terms.OnDemand[onDemandKey].priceDimensions[pd].endRange
            ),
      price: Number(
        sku.terms.OnDemand[onDemandKey].priceDimensions[pd].pricePerUnit.USD
      ),
      description:
        sku.terms.OnDemand[onDemandKey].priceDimensions[pd].description
    };
  });
  //Sort the array in ascending order
  priceRange.sort((a, b) => a.beginRange - b.beginRange);
  //console.log(priceRange);
  var size = Number(sizeInGB);
  //console.log(size);
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
      return null;
    })
    .filter(f => f != null);

  const price = priceStructure.reduce((prev, current) => {
    return prev + current.slab * current.price;
  }, 0);

  return {
    price,
    priceStructure
  };
}

export async function priceSplunkDeployment(params) {
  const {
    volumePerDay,
    compressionPercent,
    splunkArchitecture,
    splunkES,
    splunkITSI,
    clusterIndexers,
    clusterSearchHeads,
    coreIndexerRate,
    esIndexerRate
  } = params;

  console.log('params', params);

  var indexerCount = 1;

  if (splunkES === true) {
    indexerCount = volumePerDay / esIndexerRate;
  } else {
    indexerCount = volumePerDay / coreIndexerRate;
  }

  if (clusterIndexers === true && indexerCount < 3) {
    indexerCount = 3;
  } else {
    indexerCount = Math.ceil(indexerCount);
  }

  var indexerInstanceType = '';
  if (splunkArchitecture === 'Smart Store (S2)') {
    indexerInstanceType = params.s2IndexerInstanceType;
  } else {
    indexerInstanceType = params.idrIndexerInstanceType;
  }

  var coreSearchHeadCount = 1;
  if (clusterSearchHeads === true) {
    coreSearchHeadCount = 3;
  }
  //add one search head in 1 TB increments up to 10 TB
  coreSearchHeadCount += Math.floor(volumePerDay / 1000);

  var esSearchHeadCount = 0;
  if (splunkES === true) {
    esSearchHeadCount += 1;
  }

  const indexerPrice = await getEc2Price(
    indexerCount,
    indexerInstanceType,
    params.operatingSystem,
    params.location,
    params.billingOption
  );

  const coreSearchHeadPrice = await getEc2Price(
    coreSearchHeadCount,
    params.coreSearchHeadInstanceType,
    params.operatingSystem,
    params.location,
    params.billingOption
  );

  const esSearchHeadPrice = await getEc2Price(
    esSearchHeadCount,
    params.esSearchHeadInstanceType,
    params.operatingSystem,
    params.location,
    params.billingOption
  );

  var clusterMasterCount = 1;
  const clusterMasterPrice = await getEc2Price(
    clusterMasterCount,
    params.clusterMasterInstanceType,
    params.operatingSystem,
    params.location,
    params.billingOption
  );

  var licenseMasterCount = 1;
  const licenseMasterPrice = await getEc2Price(
    licenseMasterCount,
    params.licenseMasterInstanceType,
    params.operatingSystem,
    params.location,
    params.billingOption
  );

  var awsCollectorNodeCount = 1;
  const awsCollectorNodePrice = await getEc2Price(
    awsCollectorNodeCount,
    params.awsCollectorNodeInstanceType,
    params.operatingSystem,
    params.location,
    params.billingOption
  );

  // const indxerPrice = await getEc2Price(
  //   indexerCount,
  //   ec2IndexerInstance,
  //   params.billingOption
  // );

  // if (clusterIndexers) {
  //   indexerCount = 3;
  // }

  const result = {
    summary: {
      upfront: 10000,
      monthly: 3440,
      cost3Years: 100000
    },
    details: {
      ec2Cost: {
        upfront: 10000,
        monthly: 3440,
        cost3Years: 100000
      },
      ebsCost: {
        monthly: 2200
      },
      s3Cost: {
        monthly: 2232
      }
    },
    computeResources: [
      {
        name: 'Indexer',
        count: indexerCount,
        price: indexerPrice
      },
      {
        name: 'Core Search Head',
        count: coreSearchHeadCount,
        price: coreSearchHeadPrice
      },
      {
        name: 'Cluster Master',
        count: clusterMasterCount,
        price: clusterMasterPrice
      },
      {
        name: 'AWS Collector Node',
        count: awsCollectorNodeCount,
        price: awsCollectorNodePrice
      },
      {
        name: 'License Master',
        count: licenseMasterCount,
        price: licenseMasterPrice
      },

      {
        name: 'ES Search Head',
        count: esSearchHeadCount,
        price: esSearchHeadPrice
      }
    ]
  };
  console.log(result);
  return result;
}
