import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import './Projects.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function Projects(props) {
 // const [lorem, ipsum] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_PROJECTS'});
  }, []);

  const history = useHistory();
  const store = useSelector((store) => store);
  const projects = useSelector(store => store.projects);
  const idStore = useSelector((store) => store.newProject);
  const async = require("async");
  console.log('no really is it?', typeof(idStore), idStore);

  const goToProject = (id) => {
    history.push(`/WorkOrder/${id}`);
  };

  const newProjectDispatch = (callback) => dispatch({type: 'PUSH_NEW_PROJECT'});
  const newProjectPush = (id, callback) => history.push(`/ProjectInformationPage/$id`);

  function newProject (dispatchCallback, pushCallback) {
    async.waterfall([
      function dispatchCallback() {}
    ])
  }

  return (
    <div className="container">
      {/* <LanguageToggleButton /> */}

      {store.language === "english" ?
      (<h2>Projects</h2>) :
      (<h2>Proyectos</h2>)
      }

      <div className="grid">
      {(projects.length === 0) ? <p>...loading...</p> : (
        <table>
          <thead>
            {store.language === "english" ? (
            <tr>
              <th>Name</th>
              <th>Job Number</th>
            </tr>
            ) : (
            <tr>
              <th>Nombre</th>
              <th>Trabajo ID</th>
            </tr>)}
          </thead>
          <tbody>
            {projects.map( (project, index) => {

              return (
              <tr key={project.id} onClick={()=>{goToProject(project.id)}}>
                <td>{project.client_firstlast_name}</td>
                <td>00{project.project_job_number}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      )}

      </div>
      {store.language === "english" ? (
        <button onClick={()=>{newProject(newProjectDispatch, newProjectPush)}}>Add Project</button>
        ) : (
          <button onClick={newProject}>Nuevo Proyecto</button>
        )}
    </div>
  );
}

export default Projects;
