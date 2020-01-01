import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGithubRepos } from '../../actions';
import Spinner from '../layout/Spinner';

function ProfileGithub({ username, getGithubRepos, profile: { loading, repos } }) {
  useEffect(() => {
    getGithubRepos(username);
  }, [loading, username, getGithubRepos]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        (repos || []).map(repo => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}{' '}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}{' '}
                </li>
                <li className='badge badge-light'>
                  Forks: {repo.forks_coint}{' '}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  getGithubRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
