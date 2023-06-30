import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export function catFactsService() {
    return axios.get('https://cat-fact.herokuapp.com/facts');
}


export default function useCatFacts() {
    return useQuery(  {
        queryKey: ['ctcaeVersion'],
        queryFn: () => catFactsService(),
        staleTime: Infinity,
        retry: 3,
    });
}