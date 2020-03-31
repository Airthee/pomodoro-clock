import React from 'react';
import SecureLink from './SecureLink';

// Private data for the component
const data = {
  projectName: 'Pomodoro Clock',
  projectNumber: 5,
  links: [
    {
      description: 'FreeCodeCamp project',
      href: 'https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-pomodoro-clock'
    },
    {
      description: 'Repo on GitHub',
      href: 'https://github.com/Airthee/pomodoro-clock'
    }
  ]
};

// React component
class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks() {
    // Create li items
    const linkItems = data.links.map((link, index) => (
      <li key={index}>
        <i>{link.description}: <SecureLink href={link.href}>click here</SecureLink></i>
      </li>
    ));

    // Return ul item
    return (
      <ul style={{listStyleType: 'circle'}}>
        {linkItems}
      </ul>
    );
  }

  render() {
    return (
      <section>
        <h1>{data.projectName}</h1>
        <p>
          Hi ! Welcome to the {data.projectName} !<br/>
          This is a project #{data.projectNumber} Free Code Camp's "Front End Libraries" certification.<br/>
        </p>
        {this.renderLinks()}
      </section>
    );
  }
}

export default AppHeader;