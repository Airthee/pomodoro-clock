import React from 'react';

type SecureLinkProps = {
  href: string,
  openInNewTab: boolean
};

// Component
const SecureLink: React.FunctionComponent<SecureLinkProps> = (props) => {
  return (
    <a
      href={props.href}
      rel="noopener noreferrer"
      target={props.openInNewTab ? '_blank' : ''}
    >{props.children}</a>
  );
}

SecureLink.defaultProps = {
  openInNewTab: true
};

export default SecureLink;