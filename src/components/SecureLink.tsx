import React from 'react';

type SecureLinkProps = {
  href: string,
  openInNewTab: boolean
};

// Component
class SecureLink extends React.Component<SecureLinkProps> {
  // Default props values
  static defaultProps: {
    openInNewTab: true;
  };
  
  render() {
    return (
      <a
        href={this.props.href}
        rel="noopener noreferrer"
        target={this.props.openInNewTab ? '_blank' : ''}
      >{this.props.children}</a>
    );
  }
}

export default SecureLink;