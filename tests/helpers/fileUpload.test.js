import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dllicmg2a',
    api_key: '639688729757753',
    api_secret: '52fjhj7EJrd-nAtJWb17BIC_cuU',
    secure: true
});


describe('Pruebas en fileUpload', () => { 

    test('Debe de subir el archivo correctamente', async() => { 

        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe( 'string' );

        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.png', '');
        
        await cloudinary.api.delete_resources(['journal/' + imageId ], {
            resource_type: 'image'
        });
    });

    test('Debe de retornar null', async() => { 

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
    });


});