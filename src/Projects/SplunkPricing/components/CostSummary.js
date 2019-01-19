import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//https://aws.amazon.com/premiumsupport/pricing/

const BUSINESS_SUPPORT = [
  {
    percent: 0.1,
    beginRange: 0,
    endRange: 10000 // 10K,
  },
  {
    percent: 0.07,
    beginRange: 10000, //10K
    endRange: 80000 // 80K,
  },
  {
    percent: 0.05,
    beginRange: 80000, //80K
    endRange: 250000 // 250K,
  },
  {
    percent: 0.03,
    beginRange: 250000, // 250K
    endRange: Number.POSITIVE_INFINITY // 10K,
  }
];

const ENTERPRISE_SUPPORT = [
  {
    percent: 0.1,
    beginRange: 0,
    endRange: 150000 // 10K,
  },
  {
    percent: 0.07,
    beginRange: 150000, //10K
    endRange: 500000 // 80K,
  },
  {
    percent: 0.05,
    beginRange: 500000, //80K
    endRange: 1000000 // 250K,
  },
  {
    percent: 0.03,
    beginRange: 1000000, // 250K
    endRange: Number.POSITIVE_INFINITY // 10K,
  }
];

const DEVELOPER_SUPPORT = [
  {
    percent: 0.03,
    beginRange: 0,
    endRange: Number.POSITIVE_INFINITY // 10K,
  }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#232f3e',
    color: theme.palette.common.white
  },

  body: {
    fontSize: 15
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    //marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    // minWidth: 700
  },
  heading: {
    fontSize: theme.typography.pxToRem(20)
    //fontWieght: '300'
  }
});

const supportPrice = (awsSupportTier, amount, applyMinFee) => {
  //console.log('aws support', awsSupportTier);
  var minFee = 0;
  var priceRange = [];
  if (awsSupportTier === 'Business') {
    priceRange = BUSINESS_SUPPORT;
    minFee = 100;
  } else if (awsSupportTier === 'Enterprise') {
    priceRange = ENTERPRISE_SUPPORT;
    minFee = 15000;
  } else if (awsSupportTier === 'Developer') {
    priceRange = DEVELOPER_SUPPORT;
    minFee = 29;
  }

  var size = Number(amount);
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
            percent: range.percent
            //description: range.description
          };
        }
        size = size - slab;
        return {
          remainder: size,
          slab,
          percent: range.percent
          // description: range.description
        };
      }
      return null;
    })
    .filter(f => f != null);

  const price = priceStructure.reduce((prev, current) => {
    return prev + current.slab * current.percent;
  }, 0);

  return {
    amount,
    priceStructure,
    price: price < minFee && applyMinFee === true ? minFee : price
  };
};

function CostSummary(props) {
  const {
    classes,
    computeResources,
    storageResources,
    billingOption,
    awsSupportTier
  } = props;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  const upfront = computeResources.reduce(
    (prev, current) => prev + current.price.upfront,
    0
  );

  const ec2Monthly = computeResources.reduce(
    (prev, current) => prev + current.price.hourly * current.count * 730,
    0
  );

  const storageMonthly = storageResources.reduce(
    (prev, current) => prev + current.monthly,
    0
  );

  const totalMonthly = ec2Monthly + storageMonthly;

  const ec2Cost3Years = computeResources.reduce(
    (prev, current) => prev + current.price.cost3Years,
    0
  );

  // console.log(supportPrice(awsSupportTier, 1200000));
  console.log(supportPrice(awsSupportTier, 0, false));

  const storageCost3Years = storageMonthly * 36;
  const totalCost3Years = ec2Cost3Years + storageCost3Years;

  let upfrontSupportFee = 0;
  let monthlySupportFee = 0;
  let threeYearSupportFee = 0;

  if (upfront > 0) {
    // combine upfront with 1st months support
    upfrontSupportFee = supportPrice(
      awsSupportTier,
      totalMonthly + upfront,
      true
    ).price;
    monthlySupportFee = supportPrice(awsSupportTier, totalMonthly, true).price;
    threeYearSupportFee = upfrontSupportFee + monthlySupportFee * 35;
  } else {
    monthlySupportFee = supportPrice(awsSupportTier, totalMonthly, true).price;
    threeYearSupportFee = upfrontSupportFee + monthlySupportFee * 36;
  }

  const upfrontGrandTotal = upfront + upfrontSupportFee;
  const monthlyGrandTotal = totalMonthly + monthlySupportFee;
  const threeYearGrandTotal = totalCost3Years + threeYearSupportFee;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>EC2 Billing Option</CustomTableCell>
            <CustomTableCell>Total Upfront</CustomTableCell>
            <CustomTableCell>Total Monthly</CustomTableCell>
            <CustomTableCell>Total 3 Year Cost</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {billingOption.description}
              </Typography>
            </CustomTableCell>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {formatter.format(upfrontGrandTotal)}
              </Typography>
            </CustomTableCell>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {formatter.format(monthlyGrandTotal)}
              </Typography>
            </CustomTableCell>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {`${formatter.format(threeYearGrandTotal)}`}
              </Typography>
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Components</CustomTableCell>
            <CustomTableCell>Qty.</CustomTableCell>
            <CustomTableCell>Instance Type</CustomTableCell>
            {/* <CustomTableCell>vCPU | Mem | Instance Store</CustomTableCell> */}
            <CustomTableCell>vCPU</CustomTableCell>
            <CustomTableCell>Memory</CustomTableCell>
            <CustomTableCell>Instance Storage</CustomTableCell>
            <CustomTableCell>Root Volume (EBS)</CustomTableCell>
            <CustomTableCell>Upfront</CustomTableCell>
            <CustomTableCell>Monthly</CustomTableCell>
            <CustomTableCell>3 Year Cost</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {computeResources.map(row => {
            const product = row.price.product;
            return (
              <TableRow key={row.name}>
                <CustomTableCell>{row.name}</CustomTableCell>
                <CustomTableCell>{row.count}</CustomTableCell>
                <CustomTableCell>{product.instanceType}</CustomTableCell>
                {/* <CustomTableCell>{`${product.vcpu} | ${product.memory} | ${
                  product.storage
                }`}</CustomTableCell> */}
                <CustomTableCell>{product.vcpu}</CustomTableCell>
                <CustomTableCell>{product.memory}</CustomTableCell>
                <CustomTableCell>{product.storage}</CustomTableCell>
                <CustomTableCell>{row.rootVolume + ' GB'}</CustomTableCell>
                <CustomTableCell>
                  {row.price.upfront > 0
                    ? formatter.format(row.price.upfront)
                    : '-'}
                </CustomTableCell>
                <CustomTableCell>
                  {row.price.hourly > 0
                    ? formatter.format(row.price.hourly * row.count * 730)
                    : '-'}
                </CustomTableCell>
                <CustomTableCell>
                  {formatter.format(row.price.cost3Years)}
                </CustomTableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell>
              <b>Subtotal</b>
            </CustomTableCell>
            <CustomTableCell>
              <b>{upfront === 0 ? '-' : formatter.format(upfront)}</b>
            </CustomTableCell>
            <CustomTableCell>
              <b>{ec2Monthly === 0 ? '-' : formatter.format(ec2Monthly)}</b>
            </CustomTableCell>
            <CustomTableCell>
              <b>{formatter.format(ec2Cost3Years)}</b>
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell>Storage</CustomTableCell>
            <CustomTableCell>Volume Type</CustomTableCell>
            <CustomTableCell>Category</CustomTableCell>
            <CustomTableCell>Size</CustomTableCell>
            <CustomTableCell>Upfront</CustomTableCell>
            <CustomTableCell>Monthly</CustomTableCell>
            <CustomTableCell>3 Year Cost</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storageResources.map((row, i) => {
            return (
              <TableRow key={i}>
                <CustomTableCell>{row.name}</CustomTableCell>
                <CustomTableCell>{row.type}</CustomTableCell>
                <CustomTableCell>{row.category}</CustomTableCell>
                <CustomTableCell>{row.size}</CustomTableCell>
                <CustomTableCell>{'-'}</CustomTableCell>
                <CustomTableCell>
                  {formatter.format(row.monthly)}
                </CustomTableCell>
                <CustomTableCell>
                  {formatter.format(row.monthly * 36)}
                </CustomTableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />
            <CustomTableCell rowSpan={3} />

            <CustomTableCell>
              <b>Subtotal</b>
            </CustomTableCell>
            <CustomTableCell>
              <b>{formatter.format(storageMonthly)}</b>
            </CustomTableCell>
            <CustomTableCell>
              <b>{formatter.format(storageCost3Years)}</b>
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell>AWS Support Tier</CustomTableCell>
            <CustomTableCell>Upfront</CustomTableCell>
            <CustomTableCell>Monthly</CustomTableCell>
            <CustomTableCell>3 Year Cost</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell>{awsSupportTier}</CustomTableCell>
            <CustomTableCell>
              {formatter.format(upfrontSupportFee)}
            </CustomTableCell>
            <CustomTableCell>
              {formatter.format(monthlySupportFee)}
            </CustomTableCell>
            <CustomTableCell>
              {formatter.format(threeYearSupportFee)}
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

CostSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CostSummary);
