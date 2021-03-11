import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import VtuberList from "__dirname/components/VtuberList.js";
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Count from "__dirname/components/Count.js";

export default function Vtuber(props) {
  const [vtubers, setVtubers] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      const result = await callApi({path:'vtuber'});
      setVtubers(result);
      if(props.updateVtuber) props.updateVtuber(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <VtuberList vtubers={vtubers}/>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Count count={vtubers.length}>
              Vtuber 資料
            </Count>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <VtuberTable vtubers={vtubers}/>
        </AccordionDetails>
      </Accordion> */}
    </>
  )
}
