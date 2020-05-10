import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export class UserDto {
  email: string;
  companyId: number;
  firstName: string;
  lastName: string;
  identification: string;

  public fromCognito = (user: UserType) => {
    this.email = user.Attributes.find(y => y.Name === 'email').Value;
    this.firstName = user.Attributes.find(y => y.Name === 'name').Value;
    this.lastName = user.Attributes.find(y => y.Name === 'family_name').Value;
    const companyId = user.Attributes.find(y => y.Name === 'custom:company')
    if(companyId)
    this.companyId = parseInt(companyId.Value);
    
    const identification = user.Attributes.find(y => y.Name === 'custom:id');
    if(identification)
    this.identification = identification.Value;
    return this;
  }
}