
import { watchable, watch, change, changeAsync } from '../../lib/exert';


// A fake async call.
var asyncCall = (newName)=> {
  return new Promise((resolve, reject) => {
     setTimeout(()=> {
       resolve(newName);
     }, 150)
  });
}

@watchable()
class TestWatchable {

  constructor() {
    this.firstName = 'shunta';
  }

  @change updateFirstName(newName) {
    this.firstName = newName;
  }

  @changeAsync updateFirstNameAsync(newName, done) {
    setTimeout(()=> {
      this.firstName = newName;
      done();
    }, 300);
  }

  @changeAsync async updateFirstNameAsync2(done) {
    let newName = await asyncCall('Roger');
    this.firstName = newName;
    done();
  }

}

export default TestWatchable;
