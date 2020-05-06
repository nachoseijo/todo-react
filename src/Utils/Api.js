import axios from 'axios';

const apiUrl = 'http://localhost/api/v1';

export async function ApiRequest(arg) {
    // input parameter object: {method, resource, id, data}
    // returns data if the response was ok
    // false if response was not ok
    const goodStatus = [200, 201, 204]
    const url = apiUrl + '/' + arg.resource + (arg.id ? '/' + arg.id : '');
    const result = await axios({
        method: arg.method,
        url: url,
        data: arg.data
    });
    if (!goodStatus.includes(result.status))
        return false
    // if 204 return statusText instead of data
    // which is undefined
    return result.data.data || result.statusText
}
