import { useParams } from 'react-router-dom'

const DetailScreen = () => {

    const params = useParams()


    return ( 
        <div className={{display: 'flex', height: '100vh', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <h2>O id passado é {params.proponenteId}</h2>
        </div>
     );
}
 
export default DetailScreen;