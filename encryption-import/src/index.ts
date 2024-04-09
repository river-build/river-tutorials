import { EncryptionDelegate } from "@river-build/encryption-pkg";
import Olm from "@matrix-org/olm"

type OlmLib = typeof Olm

async function useEncryptionPackage(): Promise<void> {
  const delegate = new EncryptionDelegate(Olm); 
  await delegate.init();

  const outboundSession = delegate.createOutboundGroupSession();
  outboundSession.create();

  const exportedSession = outboundSession.session_key();
  const inboundSession = delegate.createInboundGroupSession();
  inboundSession.create(exportedSession);

  const encrypted = outboundSession.encrypt('have a bite of the sweet apple');
  console.log("encrypted:", encrypted);
  const decrypted = inboundSession.decrypt(encrypted);
  console.log("decrypted:", decrypted);
}

async function main() {
  console.log("~~Hello World!!~~\n");
  try {
    await useEncryptionPackage();
  } catch (e) {
    console.error(e);
  }
}

await main()
console.log("\n~~End of script~~");