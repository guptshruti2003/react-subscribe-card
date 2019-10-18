// Type definitions for react-subscribe-card
// Definitions by: Thomas Wang <thomas@wang.sh>

/* ~ You can declare types that are available via importing the module */
export interface Props {
  // children: JSX.Element[] | JSX.Element;
  status: string
  message: string
  onValidated: any
  outerCard: string
  innerCard: string
  title: string
  description: string
  subContainer: string
  subInput: string
  subButton: string
  response: string
  emailPlaceholder: string
}
