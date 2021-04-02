import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Paper from '@material-ui/core/Paper';
import moment from "moment";

const width = 60;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
    fontWeight: 600,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyleTableSortLabel = withStyles((theme) => ({
  root: {
    color: 'white !important',
  },
}))(TableSortLabel);


const useStyles = makeStyles({
  table: {},
  headImg: {
    width,
    borderRadius: '50%',
    border: '1px solid',
    verticalAlign: 'middle',
    display: 'inline-block',
    marginTop: 14,

  },
  youtube: {
    width,
    display: 'inline-block',
  },
  youtubeHref:{
    display: 'inline-block',
    position: 'relative',
    width,
  }
});

export default function VtuberTable(props) {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  let rows = props.vtubers.map(d=>{
    d._publishedAt = moment(d.publishedAt).format('YYYY/MM/DD');
    return d;
  });
  const [vtuberList, setVtuberList] = useState(rows);
  const headCells = [
    { id: 'name', label: '名稱' },
    { id: 'subscriberCount', label: '訂閱數量' },
    { id: 'viewCount', label: '觀看次數' },
    { id: 'videoCount', label: '影片數量' },
    { id: 'publishedAt', label: '頻道創立時間' },
    { id: 'country', label: '地區' },
  ];
  const classes = useStyles();
  const createSortHandler = async (id=orderBy) => {
    let __order = order;
    let r = rows;
    if (orderBy == id) {
      __order = order=='asc'?'desc':'asc';
    }
    if (id) {
      r = rows.sort((a, b)=>{
        if(typeof a[id] === 'string' && typeof b[id] === 'string') {
          if (__order=='asc') {
            return a[id].localeCompare(b[id], "zh-TW");
          }
          return b[id].localeCompare(a[id], "zh-TW");
        } else if (typeof a[id] === 'number' && typeof b[id] === 'number') {
          if (__order=='asc') {
            return a[id] - b[id];
          }
          return b[id] - a[id];
        }
        if (!a[id] && b[id]) return __order=='asc'?1:-1;
        if (!b[id] && a[id]) return __order=='asc'?-1:1;
        return 0;
      });
    }
    setVtuberList(r);
    setOrder(__order);
    setOrderBy(id);
  };
  useEffect(()=>{
    const fetchData = async () => {
      rows = props.vtubers.map(d=>{
        d._publishedAt = moment(d.publishedAt).format('YYYY/MM/DD');
        return d;
      });
      createSortHandler();
    };
    fetchData();
  }, [props.vtubers]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {headCells.map((headCell) => (
              <StyledTableCell key={headCell.id}>
                <StyleTableSortLabel
                  active={orderBy === headCell.id}
                  onClick={()=>createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span>
                      {order === 'desc' ? <ArrowDownwardIcon/> :  <ArrowUpwardIcon/>}
                    </span>
                  ) : null}
                </StyleTableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vtuberList.map((row) => (
            <StyledTableRow key={row.channelId}>
              <StyledTableCell>
       
                <a className={classes.youtubeHref} href={'https://www.youtube.com/' + row.type + '/' + row.channelId}>
                  <img className={classes.headImg} src={row.photo}></img>
                  <img className={classes.youtube} src="/youtube.png"></img>
                </a>
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.subscriberCount}</StyledTableCell>
              <StyledTableCell>{row.viewCount}</StyledTableCell>
              <StyledTableCell>{row.videoCount}</StyledTableCell>
              <StyledTableCell>{row._publishedAt}</StyledTableCell>
              <StyledTableCell>{row.country}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}