export class Badge {
  public readonly name: string;
  public readonly src: string;
  public readonly issued: Date;
  public readonly url?: string;
  public readonly verified: boolean;
  public readonly verifiedCertificationEntityUrl?: string;

  constructor(name: string, src: string, issued: Date, verified: boolean, verifiedCertificationEntityUrl?: string, url?: string) {
    this.name = name;
    this.src = src;
    this.issued = issued;
    this.verified = verified;
    this.verifiedCertificationEntityUrl = verifiedCertificationEntityUrl;
    this.url = url;
  }
}