export interface IClaims {
  aud?: string;
  iss?: string;
  iat?: number;
  nbf?: number;
  exp?: number;
  aio?: string;
  name?: string;
  nonce?: string;
  oid?: string;
  preferred_username?: string;
  rh?: string;
  sub?: string;
  tid?: string;
  uti?: string;
  ver?: string;
}

/** Archive
  {
    aud: "0dfbfd8c-e1cf-441d-8f30-449391053fc3",
    iss: "https://login.microsoftonline.com/62eca109-81a1-4fc4-9632-836e490ab4b7/v2.0",
    iat: 1634471898,
    nbf: 1634471898,
    exp: 1634475798,
    aio: "ATQAy/8TAAAAMzsIZd649lcJ5y8Q0gyVDKN3D6BqyVZjDI3aKF/oUm4eNFlqRQnh7IzAGBEtpS7i",
    name: "Tommy Tutone",
    nonce: "6f41b2bd-30f8-4af3-89f5-5a800f246577",
    oid: "e5ec2cd2-70c1-49be-8600-0f55f989ee4d",
    preferred_username: "ttutone@rdonalson.onmicrosoft.com",
    rh: "0.AW8ACaHsYqGBxE-WMoNuSQq0t4z9-w3P4R1EjzBEk5EFP8NvALo.",
    sub: "lnCYNR6cUwn2pnFybPX8zrDgqDymcsFol3MUlvoJOmM",
    tid: "62eca109-81a1-4fc4-9632-836e490ab4b7",
    uti: "hZkCZDMx-EeLGrKE6u3nAA",
    ver: "2.0",
  }
*/
