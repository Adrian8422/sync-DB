import { productIndex } from "lib/algolia";
import { airTableBase } from "lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
  airTableBase("Furniture")
    .select({
      // Selecting the first 3 records in All furniture:
      pageSize: 10,
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        const objeto = records.map(function (record) {
          return {
            objectID: record.id,
            ...record.fields,
          };
        });
        console.log("objetoooo", objeto);
        if (objeto) {
          productIndex.saveObjects(objeto);
        }

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        console.log("PAGINA PROXIMA");
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

  res.send("termino");
}
