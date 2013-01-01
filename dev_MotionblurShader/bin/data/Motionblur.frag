precision highp float;

uniform sampler2D src_tex_unit0;
uniform float useTexture;
uniform float useColors;
uniform vec4 color;

varying float depth;
varying vec4 colorVarying;
varying vec2 texCoordVarying;
		
uniform vec2 resolution;
uniform float time;
uniform sampler2D tex0;

vec3 deform( in vec2 p, float scale )
{
    vec2 uv;
   
    float mtime = scale+time;
    float a = atan(p.y,p.x);
    float r = sqrt(dot(p,p));
    float s = r * (1.0+0.5*cos(mtime*1.7));

    uv.x = .1*mtime +.05*p.y+.05*cos(-mtime+a*3.0)/s;
    uv.y = .1*mtime +.05*p.x+.05*sin(-mtime+a*3.0)/s;

    float w = 0.8-0.2*cos(mtime+3.0*a);

    vec3 res = texture2D(tex0,uv).xyz*w;
    return  res*res;

}
// http://www.iquilezles.org/apps/shadertoy/?p=Motionblur
void main(void)
{
    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
    vec3 total = vec3(0.0);
    float w = 0.0;
    for( int i=0; i<20; i++ )
    {
        vec3 res = deform(p,w);
        total += res;
        w += 0.02;
    }
    total /= 20.0;

    gl_FragColor = vec4( 3.0*total,1.0);
}

    