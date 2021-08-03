import Axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from "axios";



namespace ApiService {
    let requestConfig: AxiosRequestConfig = {

        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const repository: AxiosInstance = Axios.create(requestConfig);
    let cancelToken: any = null;
    let source: any = null;
    export function instance(): AxiosInstance {
        return repository;
    }


    export function getAll<T>(url: string, config?: any): AxiosPromise<T> {
        if (config) {
            return repository.get<T>(url, config);
        } else {
            return repository.get<T>(url)
        }
    }

    export function getWithCancel<T>(url: string, cancel: boolean): AxiosPromise<T> {
        if (cancel) {
            cancelToken = Axios.CancelToken
            source = cancelToken.source()
            return repository.get<T>(url, {
                cancelToken: source.token
            });
        } else {
            return repository.get<T>(url)
        }
    }

    export function getOne<T>(url: string, id: number): AxiosPromise<T> {
        return repository.get<T>(url + "/" + id);
    }

    export function create<T>(url: string, newOne: T, cancel: boolean = false): AxiosPromise<T> {
        if (cancel) {
            cancelToken = Axios.CancelToken
            source = cancelToken.source()
            return repository.post<T>(url, newOne, {
                cancelToken: source.token
            })
        }
        return repository.post<T>(url, newOne);
    }

    export function update<T>(url: string, newOne: T): AxiosPromise<T> {
        return repository.post<T>(url, newOne);
    }

    export function deleteOne<T>(url: string, id: number, link: boolean): AxiosPromise<T> {
        return repository.delete(url + "/" + id, {
            data: {
                followlink: link
            }
        });
    }





    export function multiRequest<T>(request: Array<any>): Promise<Array<T>> {
        return Axios.all<T>(request);
    }

    export function spread(response: any) {
        return Axios.spread(response)
    }

    export function cancel() {
        source?.cancel('Request Canceld');
    }

    export function isCancel(error: any) {
        return Axios.isCancel(error);
    }

}

export { ApiService }