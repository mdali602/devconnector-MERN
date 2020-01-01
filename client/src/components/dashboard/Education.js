import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Momont from 'react-moment';

import { deleteEducation } from '../../actions';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td> {edu.school} </td>
      <td className='hide-sm'> {edu.degree} </td>
      <td className='hide-sm'>
        <Momont format='YYYY/MM/DD'>{edu.from}</Momont> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Momont format='YYYY/MM/DD'>{edu.to}</Momont>
        )}
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className='my-2'> Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
