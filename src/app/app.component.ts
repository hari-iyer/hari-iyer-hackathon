import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',],
})
export class AppComponent {
    // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 40.7128;
  lng: number = -74.0060;
  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;

  

  public selectedValue: string;



  public progress = 0;
  public slider = {
    'autoTicks': false,
    'disabled': false,
    'invert': false,
    'max': 100,
    'min': 0,
    'showTicks': false,
    'step': 1,
    'thumbLabel': false,
    'value': 0,
    'vertical': false,
    'tickInterval': 1,
    'checked': true
  };

  keystoneIcon = {
    url: 'assets/images/star_icon_orig.png',
    scaledSize: {
      width: 75,
      height: 75
    }
  }

  pinIcon = {
    url: 'assets/images/pin.svg',
    scaledSize: {
      width: 75,
      height: 75
    }
  }
  relaxMarkers: marker[] = [
    {
      id: 1,
		  lat: this.lat,
		  lng: this.lng,
		  label: '0',
      iconType: this.keystoneIcon
    },
    {
      id:2,
		  lat: this.lat - 0.008,
		  lng: this.lng + 0.001,
		  label: '1',
      iconType: this.pinIcon
    },
    {
      id: 3,
		  lat: this.lat + 0.0042,
		  lng: this.lng + 0.0005,
		  label: '2',
      iconType: this.pinIcon
    },
    {
      id: 4,
		  lat: this.lat,
		  lng: this.lng + 0.005,
		  label: '3',
      iconType: this.pinIcon
    },
  ]

  authenticMarkers: marker[] = [
    {
      id: 1,
		  lat: this.lat,
		  lng: this.lng,
		  label: '0',
      iconType: this.keystoneIcon
    },
    {
      id: 5,
		  lat: this.lat - 0.0032,
		  lng: this.lng - 0.0003,
		  label: '1',
      iconType: this.pinIcon
    },
    {
      id: 6,
		  lat: this.lat + 0.003,
		  lng: this.lng - 0.0008,
		  label: '2',
      iconType: this.pinIcon
    },
    {
      id: 7,
		  lat: this.lat,
		  lng: this.lng - 0.007,
		  label: '3',
      iconType: this.pinIcon
	  }
  ]

  advMarkers: marker[] = [
    {
      id: 1,
		  lat: this.lat,
		  lng: this.lng,
		  label: '0',
      iconType: this.keystoneIcon
    },
    {
      id: 8,
		  lat: this.lat - 0.0043,
		  lng: this.lng - 0.0014,
		  label: '1',
      iconType: this.pinIcon
    },
    {
      id: 9,
		  lat: this.lat + 0.0041,
		  lng: this.lng - 0.0091,
		  label: '2',
      iconType: this.pinIcon
    },
    {
      id: 10,
		  lat: this.lat,
		  lng: this.lng - 0.0081,
		  label: '3',
      iconType: this.pinIcon
	  }
  ]

  luxMarkers: marker[] = [
    {
      id: 1,
		  lat: this.lat,
		  lng: this.lng,
		  label: '0',
      iconType: this.keystoneIcon
    },
    {
      id: 11,
		  lat: this.lat - 0.0012,
		  lng: this.lng - 0.0003,
		  label: '1',
      iconType: this.pinIcon
    },
    {
      id: 12,
		  lat: this.lat + 0.005,
		  lng: this.lng - 0.0004,
		  label: '2',
      iconType: this.pinIcon
    },
    {
      id: 13,
		  lat: this.lat,
		  lng: this.lng - 0.0035,
		  label: '3',
      iconType: this.pinIcon
	  }
  ]

  public tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  public color: string;
  public details = [{name:'onetest', details:'twotest'}];
  public currentCityDetails={};
  markerClicked( label:string,  index:number){
    //details
   this.currentCityDetails=this.details[index]

  }

  public availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar) {
    // Update the value for the progress-bar on an interval.
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);
  }

  openDialog() {
    const dialogRef = this._dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }
  get tickInterval(): number | 'auto' {
    return this.slider.showTicks ? (this.slider.autoTicks ? 'auto' : this.slider.tickInterval) : null;
  }
  set tickInterval(v) {
    this.slider.tickInterval = Number(v);
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  

}

interface marker {
  id: number,
	lat: number;
	lng: number;
	label?: string;
  iconType: any;
}



@Component({
  template: `
    <h1 matDialogTitle>This is a dialog</h1>
    <div matDialogContent>
      <mat-form-field>
        <label>
          This is a text box inside of a dialog.
          <input matInput #dialogInput>
        </label>
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-raised-button [matDialogClose]="dialogInput.value">CLOSE</button>
    </div>
  `,
})
export class DialogContentComponent {
  constructor( @Optional() public dialogRef: MatDialogRef<DialogContentComponent>) { 
    
  }
}
