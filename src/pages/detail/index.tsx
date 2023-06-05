import { useParams } from "react-router-dom";

const Index = (props: any) => {
    console.log('detail---', props);
    const {id} = useParams();
    return <div>Hello, World!{id}</div>;
};

export default Index;