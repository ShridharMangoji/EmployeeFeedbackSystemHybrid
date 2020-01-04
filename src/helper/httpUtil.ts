import { RequestModelComponent } from "./../components/request-model/request-model";
import { LocalStorageKeys } from "./../helper/constants";

export class HttpUtil {
    static DefaultParameter(model: RequestModelComponent) {
        model.token = localStorage.getItem(LocalStorageKeys.token);
    }
}