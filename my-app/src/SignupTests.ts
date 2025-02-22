import {User} from './user'

export class signUpTests{
    static isValidPassword(password: string): boolean {
        return password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);
      }
    
      static tests(user: User): string | null {
        if (!user.email || !user.password || !user.username) {
          return "All fields are required.";
        }
    
 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
          return "Invalid email format.";
        }
    
        if (!this.isValidPassword(user.password)) {
          return "Password must be at least 6 characters long and contain both letters and numbers.";
        }
    
        return null;
    }
}