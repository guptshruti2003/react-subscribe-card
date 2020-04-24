import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MailchimpSubscribe from "react-mailchimp-subscribe";

const SubscribeCard = ({
  mailchimpURL,
  tinyletterUsername,
  outerCardStyle,
  innerCardStyle,
  title,
  titleStyle,
  description,
  descriptionStyle,
  subContainerStyle,
  subInputStyle,
  buttonText,
  subButtonStyle,
  responseStyle,
  emailPlaceholder,
}) => {
  return mailchimpURL ? (
    <MailchimpSubscribe
      url={mailchimpURL}
      render={({ subscribe, status, message }) => (
        <NewsletterForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
          outerCard={outerCardStyle}
          innerCard={innerCardStyle}
          title={titleStyle}
          titleText={title}
          description={descriptionStyle}
          descriptionText={description}
          subContainer={subContainerStyle}
          subInput={subInputStyle}
          subButton={subButtonStyle}
          buttonText={buttonText}
          response={responseStyle}
          emailPlaceholder={emailPlaceholder}
        />
      )}
    />
  ) : tinyletterUsername ? (
    <NewsletterForm
      tinyletterUsername={tinyletterUsername}
      outerCard={outerCardStyle}
      innerCard={innerCardStyle}
      title={titleStyle}
      titleText={title}
      description={descriptionStyle}
      descriptionText={description}
      subContainer={subContainerStyle}
      subInput={subInputStyle}
      subButton={subButtonStyle}
      buttonText={buttonText}
      response={responseStyle}
      emailPlaceholder={emailPlaceholder}
    />
  ) : (
    <NewsletterForm
      outerCard={outerCardStyle}
      innerCard={innerCardStyle}
      title={titleStyle}
      titleText={title}
      description={descriptionStyle}
      descriptionText={description}
      subContainer={subContainerStyle}
      subInput={subInputStyle}
      subButton={subButtonStyle}
      buttonText={buttonText}
      response={responseStyle}
      emailPlaceholder={emailPlaceholder}
    />
  );
};

SubscribeCard.propTypes = {
  subURL: PropTypes.string,
  outerCardStyle: PropTypes.string,
  innerCardStyle: PropTypes.string,
  titleStyle: PropTypes.string,
  descriptionStyle: PropTypes.string,
  subContainerStyle: PropTypes.string,
  subInputStyle: PropTypes.string,
  subButtonStyle: PropTypes.string,
  responseStyle: PropTypes.string,
  emailPlaceholder: PropTypes.string,
};

export default SubscribeCard;

const NewsletterForm = ({
  tinyletterUsername,
  status,
  message,
  onValidated,
  outerCard,
  innerCard,
  title,
  titleText,
  description,
  descriptionText,
  subContainer,
  subInput,
  subButton,
  buttonText,
  response,
  emailPlaceholder,
}) => {
  let email;
  const submit = (event) => {
    event.preventDefault();
    return (
      email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      })
    );
  };

  const tinyURL = `https://tinyletter.com/${tinyletterUsername}`;
  const submitTiny = `window.open('https://tinyletter.com/${tinyletterUsername}', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true`;

  const placeholder = emailPlaceholder ? emailPlaceholder : "Your email";

  return tinyletterUsername ? (
    <FormWrapper outerCard={outerCard}>
      <Form
        innerCard={innerCard}
        action={tinyURL}
        method="post"
        target="popupwindow"
        onsubmit={submitTiny}
      >
        <FormTitle title={title}>
          {titleText ? titleText : `Join my newsletter`}
        </FormTitle>
        <FormDescription description={description}>
          {descriptionText
            ? descriptionText
            : `Subscribe and I'll send you my latest blog posts by email. Also,
          you'll be the first to hear about new things I'm working on.`}
        </FormDescription>
        <SubContainer subContainer={subContainer}>
          <FormInput
            id="tlemail"
            type="email"
            name="email"
            placeholder={placeholder}
            aria-label="email"
            subInput={subInput}
          />
          <input type="hidden" value="1" name="embed" />
          <FormButton type="submit" value="Subscribe" subButton={subButton}>
            {buttonText ? buttonText : `Subscribe`}
          </FormButton>
        </SubContainer>
      </Form>
    </FormWrapper>
  ) : (
    <FormWrapper outerCard={outerCard}>
      <Form onSubmit={submit} innerCard={innerCard}>
        <FormTitle title={title}>
          {titleText ? titleText : `Join my newsletter`}
        </FormTitle>
        <FormDescription description={description}>
          {descriptionText
            ? descriptionText
            : `Subscribe and I'll send you my latest blog posts by email. Also,
          you'll be the first to hear about new things I'm working on.`}
        </FormDescription>
        <SubContainer subContainer={subContainer}>
          <FormInput
            ref={(node) => (email = node)}
            type="email"
            placeholder={placeholder}
            aria-label="email"
            subInput={subInput}
          />
          <FormButton type="submit" subButton={subButton}>
            {buttonText ? buttonText : `Subscribe`}
          </FormButton>
        </SubContainer>
        {status === "sending" && (
          <FormResponse response={response} style={{ color: "#8e8e93" }}>
            sending...
          </FormResponse>
        )}
        {status === "error" && (
          <FormResponse
            response={response}
            style={{ color: "#ff2d55" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <FormResponse
            response={response}
            style={{ color: "#4cd964" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </Form>
    </FormWrapper>
  );
};

NewsletterForm.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  onValidated: PropTypes.func,
  outerCard: PropTypes.string,
  innerCard: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  subContainer: PropTypes.string,
  subInput: PropTypes.string,
  subButton: PropTypes.string,
  response: PropTypes.string,
  emailPlaceholder: PropTypes.string,
};

const FormWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 8px;
  margin: 48px auto;
  max-width: 90%;
  width: 550px;

  ${(props) => props.outerCard && props.outerCard}
`;

const Form = styled.form`
  background-color: #fdfdfd;
  border-radius: 4px;
  padding: 20px;
  margin: 0;

  ${(props) => props.innerCard && props.innerCard}
`;

const FormTitle = styled.h3`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 30px;
  font-weight: 800;
  margin: 0 0 10px 0;
  text-align: left;
  word-break: break-word;

  ${(props) => props.title && props.title}
`;

const FormDescription = styled.p`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  margin: 0 0 10px 0;
  text-align: left;

  ${(props) => props.description && props.description}
`;

const SubContainer = styled.div`
  display: flex;

  @media all and (max-width: 500px) {
    flex-direction: column;
  }

  ${(props) => props.subContainer && props.subContainer}
`;

const FormInput = styled.input`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #fdfdfd;
  color: #333333;
  border-color: #f2f2f2;
  border-style: solid;
  border-width: 5px;
  font-size: 16px;
  height: 40px;
  line-height: 20px;
  margin-bottom: 10px;
  margin-top: 0;
  padding: 10px 10px;
  box-sizing: border-box;
  width: 70%;
  max-width: 100%;
  margin-right: 16px;

  @media all and (max-width: 500px) {
    width: 100%;
  }

  ${(props) => props.subInput && props.subInput}
`;

const FormButton = styled.button`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #000000;
  border: none;
  border-radius: 25px;
  box-shadow: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  height: 40px;
  line-height: 20px;
  padding: 10px 20px;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
  }

  ${(props) => props.subButton && props.subButton}
`;

const FormResponse = styled.p`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
  text-align: center;
  margin: 0;
  margin-top: 4px;

  ${(props) => props.response && props.response}
`;
