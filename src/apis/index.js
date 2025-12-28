import * as common from "./common";
import * as lottery from "./lottery";

export const apiPostLogin = common.postLogin;
export const apiPostAsk = lottery.postAsk;
export const apiGetLotteries = lottery.getLotteries;
export const apiPostLottery = lottery.postLottery;
export const apiGetLottery = lottery.getLottery;
export const apiPutLottery = lottery.putLottery;
export const apiDeleteLottery = lottery.deleteLottery;
