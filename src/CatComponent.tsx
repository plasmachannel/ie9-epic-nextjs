import {useEffect, useState} from "react";
import useCatFacts from "@/app/useCatFacts";

export default function CatComponent() {
    const [x, setX] = useState('null');
    const {data, isLoading} = useCatFacts();


    useEffect(() => {
        var a = () => {};
        const double = [1, 2, 3].map(num => num * 2);
        console.log(double); // [2,4,6]
        const someObj = {cat: 'ab', dog: 'cd'};
        let z = { x, ...someObj };
        console.log(z);


        var bob = {
            _name: "Bob",
            _friends: ["Sally", "Tom"],
            printFriends() {
                this._friends.forEach(f => console.log(this._name + " knows " + f));
            },
        };
        console.log(bob.printFriends());
        if (data) {
            setX(JSON.stringify(data));
        }
    }, [isLoading, x, data])

    return <div>
        <button onClick={() => alert(x)}> </button>
    </div>
}