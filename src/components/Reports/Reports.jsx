import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Report from "../Report/Report";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://46.146.211.12:25540/reports/all`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const jsonRes = await res.json();
        console.log(jsonRes);
        setReports(jsonRes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {reports.map((rep) => (
        <Report
          name={rep.name}
          title={rep.title}
          message={rep.message}
          category={rep.responsibleServiceId}
          date={rep.date}
          status={rep.status}
          tags={rep.tags}
        />
      ))}
    </Stack>
  );
};

export default Reports;
