import React, { useContext, useEffect, useState } from "react";
import { Grid, Snackbar, SnackbarCloseReason } from "@material-ui/core";
import { Skeleton, Alert } from "@material-ui/lab";
import useAxios from "axios-hooks";
import PrimaryChart from "../../components/PrimaryChart";
import SecondaryChart from "../../components/SecondaryChart";
import TimeFilterButtons from "../../components/TimeFilterButtons";
import tokenContext from "../../context/tokenContext";
import { SC } from "./styled";
import { DataProps } from "interfaces/DataProps";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useQueryParams, StringParam } from "use-query-params";

const Market = () => {
  const { tokenData } = useContext(tokenContext);
  const [tokenPrices, setTokenPrices] = useState("");
  console.log("world", tokenData);

  // const {
  //   filteredDataState: { filteredData },
  // } = React.useContext(MarketContext);

  const filteredData = tokenData;
  // const [queryParams] = useQueryParams({
  //   id: StringParam,
  //   name: StringParam,
  // });
  const [timeFilter, setTimeFilter] = React.useState<string>("1");
  const [isErrorMessage, setIsErrorMessage] = React.useState<string>("");
  const [boxWidth, setBoxWidth] = React.useState<number>(0);
  const { height } = useWindowDimensions();
  const [{ data, loading, error }, fetch] = useAxios(
    {
      url: `https://api.coingecko.com/api/v3/coins/${"bitcoin"}/market_chart?vs_currency=usd&days=${"1"}`,
      method: "GET",
    },
    { manual: true }
  );
  const gridItemRef = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   if (queryParams.id && queryParams.name) {
  //     fetch();
  //   }
  // }, [fetch, queryParams, queryParams.id, queryParams.name]);

  React.useEffect(() => {
    if (error) {
      setIsErrorMessage(error.message);
    }
  }, [error]);

  React.useEffect(() => {
    const handleResize = (width?: number) => {
      setBoxWidth(width || 0);
    };

    handleResize(gridItemRef.current?.clientWidth || 0);

    window.addEventListener("resize", () =>
      handleResize(gridItemRef?.current?.clientWidth || 0)
    );

    return () => {
      window.removeEventListener("resize", () => handleResize());
    };
  }, [gridItemRef]);

  const mappedData: DataProps[] = React.useMemo(() => {
    return data
      ? data?.prices.map((ele: any) => ({
          date: new Date(ele[0]),
          price: ele[1],
        }))
      : [];
  }, [data]);

  const handleError = (
    e: React.SyntheticEvent<any>,
    reason?: SnackbarCloseReason
  ) => {
    setIsErrorMessage("");
  };

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid ref={gridItemRef} item xs={12} md={10} lg={8}>
          <SC.MarketHeader>
            <SC.Title>{"bitcoin"}</SC.Title>

            <TimeFilterButtons
              value={timeFilter}
              onChange={(v) => setTimeFilter(v || "")}
            />
          </SC.MarketHeader>
          {loading ? (
            <Skeleton
              variant="rect"
              height={Math.floor(height * 0.6)}
              width={boxWidth}
            />
          ) : (
            <>
              <PrimaryChart
                data={filteredData ?? []}
                height={Math.floor(height * 0.4)}
                width={boxWidth}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 40,
                  left: 48,
                }}
              />
            </>
          )}
        </Grid>
        <Snackbar open={!!isErrorMessage} onClose={handleError}>
          <Alert onClose={handleError} severity="error">
            {isErrorMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </React.Fragment>
  );
};

export default Market;
