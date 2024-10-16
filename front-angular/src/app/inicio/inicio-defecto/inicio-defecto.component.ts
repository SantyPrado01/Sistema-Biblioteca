import { Component } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';

@Component({
  selector: 'app-inicio-defecto',
  standalone: true,
  imports: [BarraNavegacionComponent],
  templateUrl: './inicio-defecto.component.html',
  styleUrl: './inicio-defecto.component.css'
})
export class InicioDefectoComponent {

}
