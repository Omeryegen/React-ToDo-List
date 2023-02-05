
import ListItem from './ListItem';
import Sidebar from './Sidebar';

function Showcase({ getTasks, tasks}) {

   
  return (
    <div className='showcase'>
        <Sidebar getTasks={getTasks}/> 
        <div className="list-items"> 
          {
            tasks.map(task => <ListItem  getTasks={getTasks} key={task.id}  task={task}/>)
          }
        </div>
    </div>
  )
}

export default Showcase