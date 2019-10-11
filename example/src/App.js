import React, { Component } from "react";

import NewsletterForm, { Mailchimp } from "react-subscribe-card";

export default class App extends Component {
  render() {
    const subURL = ``;

    return (
      <div>
        <Mailchimp
          url={subURL}
          render={({ subscribe, status, message }) => (
            <NewsletterForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
      </div>
    );
  }
}
