import {useEffect, useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import useCatFacts from "@/app/useCatFacts";

export default function CatComponent() {
    const [x, setX] = useState('null');
    const {data, isLoading} = useCatFacts();


    useEffect(() => {
        if (data) {
            setX(JSON.stringify(data));
        }
    }, [isLoading])

    return <div>
        <button onClick={() => alert(x)}> </button>
    </div>
}