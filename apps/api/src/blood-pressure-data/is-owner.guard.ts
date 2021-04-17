import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BloodPressureDataService } from './blood-pressure-data.service';

/**
 * This guard is for checking update and delete requests for blood pressure data.
 * It ensures that the data to update or delete was originally created by the user itself
 * 
 * This can only happen, when someone tries to use mailcous request for an attack
 * TODO: When such an attack is found, at least create a log entry
 * 
 * TODO?: It might be necessary to differ between GET and PUT or DELETE to prevent fetching data from other users also
          Currently you can't change other users data, but select it
 */

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private readonly bloodPressureDataService: BloodPressureDataService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    // Extract the user from the request (extracted from JWT)
    const user = request.user;

    // Extract the id from the request (This is the id of the record to be fetched | stored | deleted)
    const id = request.params.id;

    return this.bloodPressureDataService.isOwner(id, user.id);
  }
}
