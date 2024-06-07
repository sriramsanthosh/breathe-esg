import { CommentOutlined,CodepenOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import SortingTable from './SortingTable';

const TrackerContent: React.FC = () => {
    return (
        <div>

        <div className='widget-container'>
            <div className="widget">
                <div className='top'>
                    <div className='head'>Pending Trackers</div>
                    <h1 className='stats'>45/60</h1>
                </div>
                <div className='widget-icon-container'>
                    <span><CodepenOutlined className='widget-icon' /></span>
                </div>
            </div>
            <div className="widget">
                <div className='top'>
                    <div className='head'>Pending Reviews</div>
                    <h1 className='stats'>3</h1>
                </div>
                <div className='widget-icon-container'>
                    <span><CommentOutlined className='widget-icon' /></span>
                </div>
            </div>
        </div>
        <div className='text-right timing-text'>Autosaved at 12:31 pm</div>
        <div style={{minWidth:"200px", maxWidth:"300px"}}><Input placeholder="Search for a business" prefix={<SearchOutlined style={{color:"lightgray"}} />} /></div>
        {/* <div style={{textAlign:"center", padding:"80px 0"}}>Table will be updated soon..</div> */}
        <SortingTable />
        </div>
    );
}

export default TrackerContent;