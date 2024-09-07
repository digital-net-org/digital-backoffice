import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { type DigitalMutationConfig, type DigitalMutationPayload, type MutationMethod } from './types';
import { DigitalApi } from '../DigitalApi';

export default function useDigitalMutation<T, P = object, E = unknown>(
    key: ((payload: P) => string) | string,
    { method, retry, ...options }: DigitalMutationConfig<T, E> = { retry: 0, method: 'POST' },
) {
    return useMutation<T, AxiosError<E, any>, DigitalMutationPayload<P>>({
        mutationFn: async payload => {
            const url = key instanceof Function && payload.params ? key(payload.params) : (key as string);
            const { data } = await DigitalApi[method as MutationMethod]<T>(url, options);
            return data;
        },
        ...options,
    });
}
