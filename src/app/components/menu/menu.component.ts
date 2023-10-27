// menu.component.ts

import { AuthService } from '../auth.service'; // Importa el servicio

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'
})
export class MenuComponent {
  constructor(private authService: AuthService) {}

  estaAutenticado(): boolean {
    return this.authService.estaAutenticado;
  }
}
