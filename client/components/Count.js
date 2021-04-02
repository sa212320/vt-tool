import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -17,
    top: 11,
    border: 0,
    padding: '0 4px',
  },
}))(Badge);

export default function Count({children, count}) {
  return (
    <StyledBadge badgeContent={count} color="secondary">
      {children}
    </StyledBadge>
  );
}