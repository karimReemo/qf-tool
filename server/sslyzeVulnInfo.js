const connectionVulnInfo = {
  heartbleed:
    "Heartbleed is a vulnerability in OpenSSL, a software used to encrypt communications between a user's device and a web server (like when you see HTTPS in your web browser's address bar). This bug allows attackers to read the memory of the servers running vulnerable versions of OpenSSL. This memory could contain sensitive information, such as private keys, usernames, passwords, and personal data.",
  dos: "In a DOS attack, the attacker floods a server, website, or network with so much traffic or sends so many requests that the targeted system cannot cope. This overload prevents the system from responding to legitimate traffic, or it slows down significantly. Websites vulnerable to DOS attacks can be easily shut down with little effort and can cause a huge loss in revenue.",
  ssl2: "Data transmitted using SSL 2.0 could potentially be intercepted and decrypted by malicious actors due to weak encryption algorithms, susceptibility to man-in-the-middle attacks, and cryptographic key handling. Use of SSL 2.0 poses a significant risk to the security and privacy of user data and communications and we recommend switching to TLS 1.3 immediately.",
  ssl3: "SSL3 carries a high risk of breaches and compromised user information due to its numerous vulnerabilities. Website owners and administrators are strongly encouraged to disable SSL 3.0 support on their servers and upgrade to TLS 1.3, which provides stronger encryption and better overall security against modern cyber threats.",
  tls0: "Using TLS 1.0 could potentially allow attackers to decrypt and access sensitive data transmitted over supposedly secure connections due to susceptibility to cipher block chaining (CBC) attacks and issues related to its use of older, weaker cryptographic algorithms and hash functions. Relying on TLS 1.0 poses risks to data security and user privacy, potentially leading to data breaches and loss of trust. We highly recommend upgrading to TLS 1.3.",
  tls1: "Data transmitted using TLS 1.1 could potentially be compromised due to its reliance on older cryptographic algorithms and susceptibility to certain types of cryptographic attacks, such as padding oracle attacks. The protocol also lacks support for more robust and secure encryption methods available in later versions. Continued use of TLS 1.1 presents a considerable risk to the security and confidentiality of user data and communications. It is strongly recommended for website operators to upgrade to TLS 1.3, which offers enhanced security features, stronger encryption, and improved overall protection against modern cyber threats.",
  tls2: "Data transmitted using TLS 1.2 is considered reasonably secure and robust against various cyber threats. While TLS 1.2 remains a secure option, the evolution of cryptographic standards and the introduction of TLS 1.3, with even stronger security features and enhanced performance, make upgrading to the latest version a wise step for future-proofing website security.",
};

module.exports = connectionVulnInfo;