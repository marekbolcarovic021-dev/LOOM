import { PREMIUM_PLANS } from "../config/premiumPlans";

export function isPremium(userPremium) {
  if (!userPremium) return false;

  if (userPremium.plan !== PREMIUM_PLANS.PREMIUM.id)
    return false;

  if (!userPremium.expiresAt)
    return true;

  return new Date(userPremium.expiresAt) > new Date();
}

export function hasTokens(userPremium) {
  return (userPremium?.tokens || 0) > 0;
}

export function canUseReceiptScanner(userPremium) {
  return (
    isPremium(userPremium) ||
    hasTokens(userPremium)
  );
}

export function canUseAiCoach(userPremium) {
  return (
    isPremium(userPremium) ||
    hasTokens(userPremium)
  );
}

export function consumeToken(userPremium) {
  if (isPremium(userPremium))
    return userPremium;

  if (!hasTokens(userPremium))
    return userPremium;

  return {
    ...userPremium,
    tokens: userPremium.tokens - 1,
  };
}
