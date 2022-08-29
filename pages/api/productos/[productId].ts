import { productIndex } from "lib/algolia";
import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getOffsetAndLimitFromReq } from "lib/requests";

module.exports = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const search = req.query.productId as string;
    const limitFromQuery = req.query.limit;
    const offsetFromQuery = req.query.offset;
    const { limit, offset } = getOffsetAndLimitFromReq(
      req,
      limitFromQuery,
      offsetFromQuery
    );
    productIndex
      .search(search, {
        offset: offset,
        length: limit,
      })
      .then(({ hits }) => {
        res.send({
          results: hits,
          pagination: {
            offset,
            limit,
            total: hits.length,
          },
        });
      });
  },
});
