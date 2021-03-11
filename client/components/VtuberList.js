import React, { useEffect, useState } from 'react';
import VtuberHead from "__dirname/components/VtuberHead.js";
import moment from "moment";

export default function VtuberList(props) {
  const [vtubers, setVtubers] = useState(props.vtubers);

  useEffect(()=>{
    const fetchData = async () => {
      const docs = props.vtubers.map(d=>{
        d._publishedAt = moment(d.publishedAt).format('YYYY/MM/DD');
        return d;
      });
      setVtubers(docs);
    };
    fetchData();
  }, [props.vtubers]);

  return (
    <div>
      {vtubers.map(vtuber=>(
        <VtuberHead vtuber={vtuber} key={vtuber.channelId}></VtuberHead>
      ))}
    </div>
  );
}