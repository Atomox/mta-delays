/**
* Handle any catchs in Promise chains, and provide API error response.
*
* @param {Object} req
* @param {Object} resp
* @param {String} err
*   Error to be logged internally (not shared to user).
* @param {String} msg
*   Message to the user.
*/
export function handleRequestError(req,resp, err, msg) {
   console.warn(msg, ':', err);
   resp.json({
       msg: msg,
       status: false,
   });
}
