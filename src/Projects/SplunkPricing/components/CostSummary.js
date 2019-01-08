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
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  heading: {
    fontSize: theme.typography.pxToRem(20)
    //fontWieght: '300'
  }
});

function CostSummary(props) {
  const { classes, datasource } = props;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  const upfront = datasource.reduce(
    (prev, current) => prev + current.price.upfront,
    0
  );

  const ec2Monthly = datasource.reduce(
    (prev, current) => prev + current.price.hourly * 24 * 30,
    0
  );

  const ec2Cost3Years = datasource.reduce(
    (prev, current) => prev + current.price.cost3Years,
    0
  );
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Upfront</CustomTableCell>
            <CustomTableCell>Montly</CustomTableCell>
            <CustomTableCell>3 Year Cost</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {formatter.format(upfront)}
              </Typography>
            </CustomTableCell>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {formatter.format(ec2Monthly)}
              </Typography>
            </CustomTableCell>
            <CustomTableCell>
              <Typography className={classes.heading}>
                {formatter.format(ec2Cost3Years)}
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
            <CustomTableCell>vCores</CustomTableCell>
            <CustomTableCell>RAM</CustomTableCell>
            <CustomTableCell>Instance Storage</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasource.map(row => {
            const product = row.price.product;
            return (
              <TableRow key={row.name}>
                <CustomTableCell>{row.name}</CustomTableCell>
                <CustomTableCell>{row.count}</CustomTableCell>
                <CustomTableCell>{product.instanceType}</CustomTableCell>
                <CustomTableCell>{product.vcpu}</CustomTableCell>
                <CustomTableCell>{product.memory}</CustomTableCell>
                <CustomTableCell>{product.storage}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell>Storage</CustomTableCell>
            <CustomTableCell>Type</CustomTableCell>
            <CustomTableCell>Category</CustomTableCell>
            <CustomTableCell>Size</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell>Object Store</CustomTableCell>
            <CustomTableCell>S3 Standard</CustomTableCell>
            <CustomTableCell>Warm</CustomTableCell>
            <CustomTableCell>100 TB</CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>EBS</CustomTableCell>
            <CustomTableCell>General Purpose (SSD)</CustomTableCell>
            <CustomTableCell>Hot/Warm</CustomTableCell>
            <CustomTableCell>1000 TB</CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>EBS</CustomTableCell>
            <CustomTableCell>HDD</CustomTableCell>
            <CustomTableCell>Cold</CustomTableCell>
            <CustomTableCell>10000 TB</CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>EBS</CustomTableCell>
            <CustomTableCell>HDD</CustomTableCell>
            <CustomTableCell>RootVolumes</CustomTableCell>
            <CustomTableCell>10000 TB</CustomTableCell>
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