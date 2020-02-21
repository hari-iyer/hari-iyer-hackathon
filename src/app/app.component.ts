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
//  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.5080063;
  lng: number = -0.0761301;
  keystoneLabel: string = "Tower of London";
  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;

  

  public selectedValue: string;

  public customStyle = [
    {
      "featureType":"poi",
      "elementType":"labels",
      "stylers":[{
        visibility: "off"
      }]
    },
    {
      "featureType":"administrative",
      "elementType":"labels",
      "stylers":[{
        visibility: "off"
      }]
    },
    {
      "featureType":"transit",
      "elementType":"labels",
      "stylers":[{
        visibility: "off"
      }]
    }
  ]

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
    url: 'assets/images/star_icon_orig.svg',
    labelOrigin: {  x: 40, y: 80 },
    scaledSize: {
      width: 75,
      height: 75
    }
  }

  pinIcon = {
    url: 'assets/images/pin.svg',
    labelOrigin: { x: 40, y: 7 },
    scaledSize: {
      width: 75,
      height: 75
    }
  }
  relaxMarkers: marker[] = [
    {
      id: 0,
		  lat: this.lat,
		  lng: this.lng,
		  label: this.keystoneLabel,
      iconType: this.keystoneIcon
    },
    {
      id:1,
		  lat: this.lat - 0.008,
		  lng: this.lng + 0.001,
		  label: '1',
      iconType: this.pinIcon
    },
    {
      id: 2,
		  lat: this.lat + 0.0042,
		  lng: this.lng + 0.0005,
		  label: '2',
      iconType: this.pinIcon
    },
    {
      id: 3,
		  lat: this.lat,
		  lng: this.lng + 0.005,
		  label: '3',
      iconType: this.pinIcon
    },
  ]

  authenticMarkers: marker[] = [
    {
      id: 0,
		  lat: this.lat,
		  lng: this.lng,
		  label: this.keystoneLabel,
      iconType: this.keystoneIcon
    },
    {
      id: 5,
		  lat: 51.505554,
		  lng: -0.08969,
		  label: 'Cafe Brood',
      iconType: this.pinIcon
    },
    {
      id: 6,
		  lat: 51.509723,
		  lng: -0.078612,
		  label: 'Liberty Bounds',
      iconType: this.pinIcon
    },
    {
      id: 7,
		  lat: 51.512058,
		  lng: -0.122156,
		  label: 'Crusting Pipe',
      iconType: this.pinIcon
	  }
  ]

  activeMarkers: marker[] = [
    {
      id: 0,
		  lat: this.lat,
		  lng: this.lng,
		  label: this.keystoneLabel,
      iconType: this.keystoneIcon
    },
    {
      id: 9,
		  lat: 51.502171,
		  lng: -0.129329,
		  label: 'Chruchill War Rooms',
      iconType: 
      { 
        url: 'assets/images/pin.svg',
        labelOrigin: { x: 40, y: 60 },
        scaledSize: {
          width: 75,
          height: 75
        }
      }
    },
    {
      id: 10,
		  lat: 51.519447,
		  lng: -0.126878,
		  label: 'British Museum',
      iconType: this.pinIcon
    },
    {
      id: 11,
		  lat: 51.503464,
		  lng: -0.119404,
		  label: 'The London Eye',
      iconType: this.pinIcon
	  }
  ]

  luxMarkers: marker[] = [
    {
      id: 0,
		  lat: this.lat,
		  lng: this.lng,
		  label: this.keystoneLabel,
      iconType: this.keystoneIcon
    },
    {
      id: 13,
		  lat: this.lat - 0.0012,
		  lng: this.lng - 0.0003,
		  label: '1',
      iconType: this.pinIcon
    },
    {
      id: 14,
		  lat: this.lat + 0.005,
		  lng: this.lng - 0.0004,
		  label: '2',
      iconType: this.pinIcon
    },
    {
      id: 15,
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
  public details = [{name:'Churchill War Rooms', type:'Museum', distance:'2.7', averageSpend:'$45.69',description:'History was made in Churchill War Rooms – the underground nerve centre that allowed Britain’s leaders to plot the allied route to victory during the Second World War. Step back in time and walk the top secret corridors of the Cabinet War Rooms.',picture:'https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JD_ArticleMainImageFaceDetect/425043'},{name:'British Museum', type:'Museum', distance:'2.5', averageSpend:'$32.41',description:'The British Museum, in the Bloomsbury area of London, is a public institution dedicated to human history, art and culture. Its permanent collection of some eight million works is among the largest and most comprehensive in existence, having been widely sourced during the era of the British Empire.',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'British Museum', type:'Museum', distance:'2.5', averageSpend:'$32.41',description:'The British Museum, in the Bloomsbury area of London, is a public institution dedicated to human history, art and culture. Its permanent collection of some eight million works is among the largest and most comprehensive in existence, having been widely sourced during the era of the British Empire.',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'British Museum', type:'Museum', distance:'2.5', averageSpend:'$32.41',description:'The British Museum, in the Bloomsbury area of London, is a public institution dedicated to human history, art and culture. Its permanent collection of some eight million works is among the largest and most comprehensive in existence, having been widely sourced during the era of the British Empire.',picture:''}
  ,{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'The London Eye', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''},{name:'Cafe Brood', type:'', distance:'twotest', averageSpend:'test',description:'',picture:''}];
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
