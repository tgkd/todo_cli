import platform from 'platform';
export default function() {
  let version = platform.version.split('.');
  return {
    os: platform.os.toString(),
    browser: `${platform.name} ${version[0]}`,
    type: platform.product || 'PC'
  };
}

