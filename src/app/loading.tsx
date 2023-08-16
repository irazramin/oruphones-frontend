'use client'
import {useEffect, useRef} from "react";
import LoadingBar from "react-top-loading-bar";

export default  function  Loading()  {
    const ref: any = useRef(null);

    const barColor: string = '#BAB6EB';

    useEffect(() => {
        ref.current?.continuousStart();
    }, []);

   return <LoadingBar color={barColor} ref={ref} />
};
