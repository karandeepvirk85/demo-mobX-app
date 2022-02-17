import { useStore } from "../store"
import {FC, useState} from "react"
import { observer } from "mobx-react-lite"
import { Button, Table } from 'antd';


const Home = () =>{
    const Form:FC = () =>{
        const columns = [
            {
                title:"Index",
                dataIndex: "index",
                key: "index"
            },
            {
                title:"Transaction ID",
                dataIndex: "transactionId",
                key: "transactionId"
            },
            {
                title:"Hash",
                dataIndex: "hash",
                key: "hash"
            }
        ];
        const store = useStore();
        
        const data: any = [];
        
        {
            store.blocks.map((items, index) =>{
                data.push({
                    key:index, 
                    hash: items.hash,
                    transaction: items.transactions
                });
            })
        }
        console.log(data);
        const [message, setMessage] = useState("");
        
        const Title:FC = observer(() =>{
            return (
                <p>{store.getNumberOfBlock} Blocks</p>
            )
        });

        const Blocks:FC = observer(() =>{
            return (
                <div>
                    <h2>Blocks</h2>
                    <Table columns={columns} dataSource={data} />
                </div>
            )
        });

        return(
           
            <form onSubmit={(e) =>{
                e.preventDefault();
                store.addTransaction(message);
                setMessage("");
            }}>               
                <input 
                    type="text"
                    value={message}
                    onChange ={(event =>{
                        setMessage(event.target.value)
                    })}
                    placeholder="Enter Transaction ID"
                    required
                />
                
                <Button type="primary" htmlType="submit">Submit</Button>
                
                    {
                        <>                    
                            <Title/>
                            <Blocks/>
                        </>
                    }
            </form>
        );
    }
    return(
        <main>
            <Form/>
        </main>
    );
}
export default Home;