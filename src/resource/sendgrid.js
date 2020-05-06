import sgMail from '@sendgrid/mail'
const API_KEY = process.env.SENDGRID_API_KEY
const SKIP = process.env.SENDGRID_SKIP
sgMail.setApiKey(API_KEY)
sgMail.setSubstitutionWrappers('{{', '}}')

const templates = {
  passwordReset: "d-3ae25478ec56406996ecf8628df051a5",
  welcome: "d-44c1a4c614a64f0db05c76ae958821fa",
  campaignCreated: "d-914e9fb417e4470b9e4fc3b8329321ba",
  campaignShipped: "d-963ac0d67c1549b38e6289980129b595",
  storeConnected: "d-3c527dcd7fed43f0a0d3a655748513b5",
  adminStoreConnected: "d-fb30ba9f0e344c5a9051436868cea88c",
  adminNewClientJoined: "d-da45fe175409428783081e6c650a1eb7",
  trigCampaignDailyReport: "d-83300e49da5a41ee83474b65946ad76b",
  campaignPaused: "d-6ea98299d6e446dbb0af150184a613da",
  campaignPausedBudget: "d-17f9fd61cb484b27bf6bec0298725875",
  campaignStarted: "d-25c31ccbd5c448498ea37ee8ddfa3533"
}

const actions = {}

actions.sendEmail = (msgInfo) => {
  const msg = {
    to: msgInfo.to,
    from: msgInfo.from,
    subject: msgInfo.subject,
    templateId: templates[msgInfo.template],
    dynamic_template_data: msgInfo.dynamic_template_data,
  }

  if(SKIP !== 'true'){
    return sgMail.send(msg)
  }
}

export default actions
